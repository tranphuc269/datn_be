import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticatedService: AuthService) {
        super({ userNameField: 'email' })
    }
    async validate(email: string, password: string) {
        return this.authenticatedService.getAuthenticatedUser(email, password)
    }
}