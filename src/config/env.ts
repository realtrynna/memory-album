import yaml from "js-yaml";
import { readFileSync } from "fs";
import { join } from "path";

import { NODE_ENV } from "@/constant";

export default () => {
    const env = yaml.load(
        readFileSync(join(process.cwd(), "env.yaml"), "utf8"),
    ) as Record<string, any>;

    if (!env[NODE_ENV]) {
        throw new Error("프로젝트 환경 변수 파일을 찾을 수 없습니다.");
    }

    return env;
};
