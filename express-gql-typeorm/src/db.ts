import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "valik",
    password: "0000",
    database: "ex",
    entities: [User],
    logging: true,
    synchronize: true,
})