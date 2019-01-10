import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyScheduleService } from './currency-schedule.service';

@Module({
    imports: [TypeOrmModule.forFeature([Currency]), PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule],
    providers: [CurrencyService, CurrencyScheduleService],
    controllers: [CurrencyController],
})
export class CurrencyModule {}
