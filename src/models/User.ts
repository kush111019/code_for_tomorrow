import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    static find() {
        throw new Error("Method not implemented.");
    }
    static findOneBy(arg0: { email: string; }) {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({type:"varchar",unique: true})
    email: string | undefined;

    @Column({type:"varchar",length:255,nullable:false})
    password: string = "";
}