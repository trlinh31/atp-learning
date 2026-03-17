interface ArticleTableProps {
  caption: string;
  headers: string[];
  rows: string[][];
  source?: string;
}

export function ArticleTable({ caption, headers, rows, source }: ArticleTableProps) {
  return (
    <figure className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-white">
        <table className="min-w-full divide-y divide-border text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70 text-foreground">
            {rows.map((row, idx) => (
              <tr key={`${row[0]}-${idx}`} className="bg-white/70">
                {row.map((cell, cellIdx) => (
                  <td key={`${cell}-${cellIdx}`} className="px-4 py-3 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="text-xs text-muted-foreground">
        {caption}
        {source && (
          <span className="block text-[11px] uppercase tracking-widest text-muted-foreground/70">
            Source: {source}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
