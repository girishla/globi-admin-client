

import { User } from "app/shared/models/user.model";

export interface AuthResponse {
        token: string;
        user: User;
    }

