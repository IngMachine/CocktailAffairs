import {User} from "./user.interface";

export interface Bartender {
    user: User | string,
    age: number;
    // TODO: Quisiera tener unas especialidades definidas en la base de datos
    specialties: string[];
    professionalDescription: string;
    imageUrl: string;
    public_id: string;
    isAvailable: boolean;
}