import { DataSource } from "typeorm";
import { CommentLike } from "./entity/comment_like.entity";
import { Injectable } from "@nestjs/common";

export const commentsLikeProvider = [

    {
        provide:'COMMENTS_LIKES_REPOSITORY',
        useFactory:(dataSource:DataSource) => dataSource.getRepository(CommentLike),
        inject:['DATA_SOURCE']
    }

]