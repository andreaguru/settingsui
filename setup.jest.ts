import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

// There is an issue with RJSF mui package and Jest,
// so we temporary need to mock it this way until a better solution comes up
jest.mock("@rjsf/mui", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return jest.requireActual("@rjsf/core");
});
