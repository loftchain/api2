import { ApiModelProperty } from '@nestjs/swagger';

export class CustomerDto {
    @ApiModelProperty()
    readonly name: string;
    @ApiModelProperty()
    readonly currencyEth: string;
    @ApiModelProperty()
    readonly walletEth: string;
    @ApiModelProperty()
    readonly currencyBtc: string;
    @ApiModelProperty()
    readonly walletBtc: string;
}
