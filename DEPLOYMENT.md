# 🚀 Production Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Domain name (for production)

## Environment Setup

1. **Copy environment variables:**

   ```bash
   cp .env.example .env
   ```

2. **Configure production environment variables:**
   ```env
   DATABASE_URL="postgresql://username:password@host:5432/database"
   NEXTAUTH_SECRET="your-super-secure-secret-key-min-32-chars"
   NEXTAUTH_URL="https://yourdomain.com"
   NODE_ENV="production"
   ```

## Database Setup

1. **Generate Prisma client:**

   ```bash
   npm run db:generate
   ```

2. **Push database schema:**

   ```bash
   npm run db:push
   ```

3. **Migrate existing users (if any):**
   ```bash
   npm run migrate:production
   ```

## Build & Deploy

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard**

### Option 2: Docker

1. **Create Dockerfile:**

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build:production
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run:**
   ```bash
   docker build -t finance-tracker .
   docker run -p 3000:3000 finance-tracker
   ```

### Option 3: Traditional Server

1. **Build the application:**

   ```bash
   npm run build:production
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## Post-Deployment Checklist

- [ ] Database connection working
- [ ] Authentication working
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] Error monitoring configured
- [ ] Backup strategy in place
- [ ] Performance monitoring setup

## Monitoring & Maintenance

### Health Checks

- Visit `/status` to check system health
- Monitor `/api/database/status` for database connectivity

### Logs

- Production logs are in JSON format
- Consider integrating with logging services like DataDog, LogRocket, or Sentry

### Security

- Regular security updates
- Monitor for suspicious activity
- Regular database backups
- SSL certificate renewal

## Performance Optimization

### Database

- Add database indexes for frequently queried fields
- Consider connection pooling for high traffic
- Regular database maintenance

### Caching

- Consider adding Redis for session storage
- Implement API response caching
- Use CDN for static assets

### Monitoring

- Set up uptime monitoring
- Performance monitoring (Core Web Vitals)
- Error tracking and alerting

## Scaling Considerations

### Horizontal Scaling

- Load balancer configuration
- Session store (Redis/Database)
- Database read replicas

### Vertical Scaling

- Server resource monitoring
- Database performance tuning
- Memory and CPU optimization

## Backup Strategy

### Database Backups

```bash
# Daily automated backups
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Application Backups

- Code repository (Git)
- Environment configurations
- User uploaded files (if any)

## Troubleshooting

### Common Issues

1. **Database connection fails**: Check DATABASE_URL and network connectivity
2. **Authentication not working**: Verify NEXTAUTH_SECRET and NEXTAUTH_URL
3. **Build fails**: Run `npm run type-check` to identify TypeScript issues
4. **Performance issues**: Check database queries and add indexes

### Debug Mode

Set `NODE_ENV=development` temporarily to see detailed error messages.

## Support

For production support:

- Check `/status` endpoint for system health
- Review application logs
- Monitor database performance
- Check external service dependencies
