import { MarkdownView, Plugin}  from "obsidian";
import { updateEssayPlugin } from "./updateEssayPlugin";

export default class UpdateEssayPercentage extends Plugin {

  // onload runs when plugin becomes enabled.
  async onload(): Promise<void> {
    this.registerEditorExtension([updateEssayPlugin]);
  }

}
