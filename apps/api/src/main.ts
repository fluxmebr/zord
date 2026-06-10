import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import helmet from 'helmet'
import * as compression from 'compression'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 3001)
  const nodeEnv = configService.get<string>('NODE_ENV', 'development')

  // Logger
  app.useLogger(app.get(Logger))

  // Security
  app.use(helmet({
    contentSecurityPolicy: nodeEnv === 'production',
    crossOriginEmbedderPolicy: false,
  }))
  app.use(compression())

  // CORS
  app.enableCors({
    origin: configService.get<string>('APP_URL', 'http://localhost:3000'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
  })

  // Versioning
  app.enableVersioning({ type: VersioningType.URI })
  app.setGlobalPrefix('api')

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  // Global filters & interceptors
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())

  // Swagger (dev only)
  if (nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('ZORD API')
      .setDescription('ZORD Intelligence Operating System — REST API')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer(`http://localhost:${port}`)
      .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api/docs', app, document)
  }

  await app.listen(port)
  console.log(`ZORD API running on http://localhost:${port}`)
  console.log(`Environment: ${nodeEnv}`)
}

bootstrap()
