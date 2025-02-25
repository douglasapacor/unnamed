declare namespace Neutralino {
  function init(): void;

  namespace os {
    function showNotification(
      title: string,
      content: string,
      icon?: "INFO" | "WARNING" | "ERROR" | "QUESTION"
    ): Promise<void>;
  }

  // namespace filesystem {
  //   function readFile(path: string): Promise<string>;
  // }
}

declare const Neutralino: typeof Neutralino;
