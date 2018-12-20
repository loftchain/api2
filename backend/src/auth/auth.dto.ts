import { ApiModelProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    password: string;
}
