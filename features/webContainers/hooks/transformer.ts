import { TemplateFile, TemplateFolder } from "@/features/playground/lib/path-to-json";

type TemplateItem = TemplateFile | TemplateFolder;

interface WebContainerFile {
  file: {
    contents: string;
  };
}

interface WebContainerDirectory {
  directory: {
    [key: string]: WebContainerFile | WebContainerDirectory;
  };
}

type WebContainerFileSystem = Record<string, WebContainerFile | WebContainerDirectory>;

const isTemplateFolder = (item: TemplateItem): item is TemplateFolder => {
  return "folderName" in item;
};

const itemToName = (item: TemplateItem): string => {
  return isTemplateFolder(item)
    ? item.folderName
    : `${item.filename}.${item.fileExtension}`;
};

export function transformToWebContainerFormat(template: TemplateFolder): WebContainerFileSystem {
  function processItem(item: TemplateItem): WebContainerFile | WebContainerDirectory {
    if (isTemplateFolder(item)) {
      const directoryContents: WebContainerFileSystem = {};

      item.items.forEach(subItem => {
        const key = itemToName(subItem);
        directoryContents[key] = processItem(subItem);
      });

      return {
        directory: directoryContents
      };
    }

    return {
      file: {
        contents: item.content
      }
    };
  }

  const result: WebContainerFileSystem = {};

  template.items.forEach(item => {
    const key = itemToName(item);
    result[key] = processItem(item);
  });

  return result;
}