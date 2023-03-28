/**
 * A Home Controller
 */

import { PUBLIC_PATH, BASE_URL } from "../consts.js";
import path from "path";
import fs from "fs";

export const home = (req, res) => {
  // get the avatars path
  const avatarsPath = path.join(PUBLIC_PATH, "images", "avatars");

  // read all the avatars from directory
  const avatarFiles = fs.readdirSync(avatarsPath);

  // map all the avatars and get their url
  const avatars = avatarFiles.map((avatar) => ({
    fileName: avatar,
    url: `${BASE_URL}/images/avatars/${avatar}`,
  }));

  res.render("home", {
    avatars,
  });
};
