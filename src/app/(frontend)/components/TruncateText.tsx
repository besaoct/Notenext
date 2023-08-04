
export default function TruncateText(text:string, maxLength:number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
}

