import { DataSource } from "typeorm"
import { Board } from "./entity/board.entity"
import { Inject } from "@nestjs/common";

export const boardProviders = [
    {
        provide:'BOARD_REPOSITORY',
        useFactory:(dataSource:DataSource) => dataSource.getRepository(Board),
        inject:['DATA_SOURCE']
    }
]