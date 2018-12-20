import { ApiModelProperty } from '@nestjs/swagger';

export class CurrencyDto {
    @ApiModelProperty()
    readonly pair: string;
    @ApiModelProperty()
    readonly price: string;
    @ApiModelProperty()
    readonly timestamp: string;
}
