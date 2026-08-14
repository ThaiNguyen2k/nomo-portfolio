import type { CSSProperties } from "react";

type CssVariables = CSSProperties & Record<`--${string}`, string | number>;

const clusters = [
  {
    className: "cluster-one",
    nodes: [[8, 27], [24, 9], [39, 30], [57, 15], [72, 40], [49, 58], [22, 63], [84, 70]],
    links: [[8, 27, 21, -42], [24, 9, 25, 44], [39, 30, 23, -35], [39, 30, 38, 15], [72, 40, 33, 147], [49, 58, 32, 171], [72, 40, 38, 52]],
  },
  {
    className: "cluster-two",
    nodes: [[11, 16], [30, 31], [48, 12], [66, 28], [89, 18], [78, 54], [54, 67], [25, 72]],
    links: [[11, 16, 28, 29], [30, 31, 25, -31], [48, 12, 25, 29], [66, 28, 26, -13], [66, 28, 31, 45], [78, 54, 28, 152], [54, 67, 31, 170], [30, 31, 35, 50]],
  },
  {
    className: "cluster-three",
    nodes: [[7, 56], [21, 29], [43, 43], [59, 16], [77, 35], [91, 62], [64, 73], [34, 78]],
    links: [[7, 56, 31, -60], [21, 29, 30, 29], [43, 43, 25, -44], [59, 16, 27, 35], [77, 35, 33, 56], [91, 62, 30, 158], [64, 73, 32, 171], [43, 43, 40, 48]],
  },
  {
    className: "cluster-four",
    nodes: [[8, 18], [27, 8], [44, 27], [63, 11], [84, 26], [74, 55], [48, 70], [19, 62]],
    links: [[8, 18, 22, -26], [27, 8, 24, 45], [44, 27, 24, -41], [63, 11, 24, 32], [84, 26, 32, 107], [74, 55, 35, 151], [48, 70, 35, 166], [19, 62, 38, -53]],
  },
  {
    className: "cluster-five",
    nodes: [[5, 42], [17, 16], [36, 31], [53, 9], [68, 38], [91, 23], [81, 65], [49, 76], [22, 69]],
    links: [[5, 42, 31, -64], [17, 16, 28, 31], [36, 31, 27, -44], [53, 9, 35, 49], [68, 38, 28, -18], [68, 38, 34, 49], [81, 65, 37, 164], [49, 76, 34, 168]],
  },
  {
    className: "cluster-six",
    nodes: [[9, 13], [31, 24], [51, 7], [72, 26], [92, 12], [85, 51], [61, 69], [37, 53], [12, 72]],
    links: [[9, 13, 29, 23], [31, 24, 25, -33], [51, 7, 28, 36], [72, 26, 25, -25], [72, 26, 30, 54], [85, 51, 34, 148], [61, 69, 32, -143], [37, 53, 32, 153]],
  },
];

const glyphs = [
  ["ring", 7, 6, 54, 0], ["cross", 88, 10, 32, .4], ["diamond", 4, 19, 40, .8],
  ["bracket", 92, 25, 46, 1.2], ["orbit", 8, 32, 58, 1.6], ["cross", 89, 38, 38, 2],
  ["diamond", 5, 47, 50, 2.4], ["ring", 91, 53, 44, 2.8], ["bracket", 7, 61, 52, 3.2],
  ["orbit", 89, 68, 62, 3.6], ["cross", 5, 75, 34, 4], ["diamond", 92, 82, 46, 4.4],
  ["ring", 8, 89, 52, 4.8], ["bracket", 88, 94, 42, 5.2], ["cross", 50, 14, 26, 5.6],
  ["diamond", 48, 40, 30, 6], ["ring", 52, 64, 32, 6.4], ["orbit", 47, 87, 38, 6.8],
];

const rails = ["rail-one", "rail-two", "rail-three", "rail-four", "rail-five", "rail-six"];
const fields = ["field-one", "field-two", "field-three", "field-four", "field-five"];

export default function TechBackground() {
  return (
    <div className="tech-background" aria-hidden="true">
      {clusters.map((cluster, clusterIndex) => (
        <div className={`tech-constellation ${cluster.className}`} key={cluster.className}>
          {cluster.links.map(([x, y, length, angle], index) => (
            <i
              className="tech-link"
              style={{ "--x": `${x}%`, "--y": `${y}%`, "--length": `${length}%`, "--angle": `${angle}deg`, "--delay": `${clusterIndex * .7 + index * .26}s` } as CssVariables}
              key={`link-${index}`}
            />
          ))}
          {cluster.nodes.map(([x, y], index) => (
            <b
              className="tech-node"
              style={{ "--x": `${x}%`, "--y": `${y}%`, "--delay": `${clusterIndex * .55 + index * .34}s` } as CssVariables}
              key={`node-${index}`}
            />
          ))}
        </div>
      ))}
      {glyphs.map(([type, x, y, size, delay], index) => (
        <span className={`tech-glyph glyph-${type}`} style={{ "--x": `${x}%`, "--y": `${y}%`, "--size": `${size}px`, "--delay": `${delay}s` } as CssVariables} key={`${type}-${index}`}><i /></span>
      ))}
      {rails.map((rail, railIndex) => (
        <div className={`pixel-data-rail ${rail}`} key={rail}>{Array.from({ length: 14 }, (_, index) => <i style={{ "--index": index + railIndex } as CssVariables} key={index} />)}</div>
      ))}
      {fields.map((field, fieldIndex) => (
        <div className={`pixel-field ${field}`} key={field}>{Array.from({ length: 20 }, (_, index) => <i style={{ "--index": index + fieldIndex * 3 } as CssVariables} key={index} />)}</div>
      ))}
      <span className="tech-scanline" />
    </div>
  );
}
