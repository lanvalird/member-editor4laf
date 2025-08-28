import type { MemberList } from "@/types";

import { createContext } from "react";

export const EditorContext = createContext<{
  members: MemberList;
}>({
  members: [],
});
