import { DataSource } from "typeorm"
import { BoardLike } from "./entity/board_like.entity"

export const boardLikeProviders = [
    {
        provide:'BOARD_LIKE_REPOSITORY',
        useFactory:(dataSource:DataSource) => dataSource.getRepository(BoardLike),
        inject:['DATA_SOURCE']
    }
]