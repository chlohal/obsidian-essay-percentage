import { ensureSyntaxTree, syntaxTree } from "@codemirror/language";
import { EditorState, Text } from "@codemirror/state";
import { ViewUpdate, PluginValue, ViewPlugin } from "@codemirror/view";
import { ESSAY_TARGET, formatMessage } from "./config";
import updateDiscord from "./updateDiscord";

class UpdateEssayPlugin implements PluginValue {    
    update(update: ViewUpdate) {
        if (update.docChanged) {
            this.recountWords(update.state);
        }
    }
    
    recountWords(state: EditorState) {
        const wordCount = countWords(state);
        console.log("smart word count: " + wordCount);
        const wordPercentage = wordCount / ESSAY_TARGET;
        const status = formatMessage(wordPercentage * 100);
        
        updateDiscord(status);
    }

    destroy() {
    }
}

function countWords(doc: EditorState) {
    let counter = 0;
    syntaxTree(doc).iterate({
        enter: (node) => {            
            if (node.name == "Document") return true;

            if (node.name.includes("frontmatter") || node.name.includes("header")) {
                counter -= countWordsString(doc.sliceDoc(node.from, node.to));
                return false;
            }
        }
    });
    let iter = doc.doc.iter();
    while (!iter.next().done) {
        counter += countWordsString(iter.value);
    }
    return counter;
}

function countWordsString(str: string) {
    let inWord = false, count = 0;
    for (let i = 0; i < str.length; i++) {
        let word = /\w/.test(str[i]);
        if (word && !inWord) count++;
        inWord = word;
    }
    return count;
}

export const updateEssayPlugin = ViewPlugin.fromClass(UpdateEssayPlugin);
