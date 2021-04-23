const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const downloadFile = (data: string): void => {
  const blob = new Blob([data], { type: "text/json" });
  const el = document.getElementById("dummyForDownload") as HTMLAnchorElement;
  el.href = window.URL.createObjectURL(blob);
  el.click();
  el.href = "#";
};

export const utils = {
  range: range,
  downloadFile: downloadFile,
};
