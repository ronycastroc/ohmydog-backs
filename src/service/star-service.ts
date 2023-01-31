import { requestError } from "@/errors/request-error";
import starRepository from "@/repositories/start-repository";
import { stars } from "@prisma/client";
import postService from "./post-service";

const createStar = async (postId: number, userId: number): Promise<stars> => {
  await postService.readPostById(postId);

  const starExists = await starRepository.readByPostUserId(postId, userId);

  if (starExists) throw requestError("StarAlreadyExists");

  const result = await starRepository.create({ postId, userId });

  return result;
};

const starService = {
  createStar,
};

export default starService;