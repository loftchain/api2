import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    password: string;
}
