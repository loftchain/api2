import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Currency]), PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule],
    providers: [CurrencyService],
    controllers: [CurrencyController],
})
export class CurrencyModule {}
