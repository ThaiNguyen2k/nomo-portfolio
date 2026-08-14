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
];

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
      <div className="pixel-data-rail rail-one">{Array.from({ length: 14 }, (_, index) => <i style={{ "--index": index } as CssVariables} key={index} />)}</div>
      <div className="pixel-data-rail rail-two">{Array.from({ length: 11 }, (_, index) => <i style={{ "--index": index } as CssVariables} key={index} />)}</div>
      <span className="tech-scanline" />
    </div>
  );
}
