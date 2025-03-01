import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import ImageNew from '~/components/elements/image-new';
import { getBlueprints } from '~/lib/sanity/requests';

export default function Blueprints() {
  const [articles, setArticles] = useState([]);
  const [hoveredGraph, setHoveredGraph] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [zoomedArticle, setZoomedArticle] = useState(null);
  const d3Container = useRef(null);
  const simulationRef = useRef(null);
  const groupRef = useRef(null);
  const zoomBehaviorRef = useRef(null);
  const nodesDataRef = useRef({});
  const componentHeight = 450;

  useEffect(() => {
    async function fetchFeaturedArticles() {
      const featuredArticles = await getBlueprints([1, 12]);
      setArticles(featuredArticles);
    }
    fetchFeaturedArticles();
  }, []);

  const zoomToNode = useCallback((nodeId, position) => {
    const svg = d3.select(d3Container.current).select('svg');
    const g = groupRef.current;
    const width = d3Container.current.clientWidth;
    const height = componentHeight;
    const scale = 1.8;
    const tx = width / 2 - scale * position.x + 100;
    const ty = height / 2 - scale * position.y;
    svg
      .transition()
      .duration(500)
      .call(
        zoomBehaviorRef.current.transform,
        d3.zoomIdentity.translate(tx, ty).scale(scale)
      );
    setZoomedArticle(nodeId);
  }, []);

  const resetZoom = useCallback(() => {
    const svg = d3.select(d3Container.current).select('svg');
    svg
      .transition()
      .duration(500)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    setZoomedArticle(null);
  }, []);

  useEffect(() => {
    if (articles.length && d3Container.current) {
      d3.select(d3Container.current).selectAll('*').remove();
      const width = d3Container.current.clientWidth;
      const height = componentHeight;
      const svg = d3
        .select(d3Container.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      const g = svg.append('g');
      groupRef.current = g;
      zoomBehaviorRef.current = d3
        .zoom()
        .scaleExtent([1, 5])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        })
        .filter(() => false);
      svg.call(zoomBehaviorRef.current);
      const nodes = articles.map((article, i) => ({
        id: article.slug,
        title: article.title,
        x: ((i + 1) * width) / (articles.length + 1),
        y: height / 2 + (Math.random() - 0.5) * height * 0.8,
      }));
      const edgeGroup = g.append('g').attr('class', 'edges');
      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          edges.push({ source: nodes[i], target: nodes[j] });
        }
      }
      const edgeElements = edgeGroup
        .selectAll('path')
        .data(edges)
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.1);
      simulationRef.current = d3
        .forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
        .force('collision', d3.forceCollide(60))
        .force(
          'x',
          d3
            .forceX()
            .x((d) => d.x)
            .strength(0.5)
        )
        .force(
          'y',
          d3
            .forceY()
            .y((d) => d.y)
            .strength(0.2)
        )
        .on('tick', () => {
          edgeElements.attr('d', function (d) {
            const x1 = d.source.x;
            const y1 = d.source.y;
            const x2 = d.target.x;
            const y2 = d.target.y;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const norm = Math.sqrt(dx * dx + dy * dy) || 1;
            const offset = 20;
            const ox = (-dy / norm) * offset;
            const oy = (dx / norm) * offset;
            return `M ${x1},${y1} Q ${mx + ox},${my + oy} ${x2},${y2}`;
          });
          nodeGroups.attr('transform', (d) => {
            d.x = Math.max(10, Math.min(width - 10, d.x));
            d.y = Math.max(10, Math.min(height - 10, d.y));
            return `translate(${d.x},${d.y})`;
          });
          textGroups.attr('transform', (d) => {
            const tx = Math.max(0, Math.min(width - 100, d.x - 50));
            let ty;
            if (d.y < height / 2) {
              ty = Math.max(0, Math.min(height - 30, d.y - 45));
            } else {
              ty = Math.max(0, Math.min(height - 30, d.y + 15));
            }
            return `translate(${tx},${ty})`;
          });
          nodes.forEach((d) => {
            nodesDataRef.current[d.id] = { x: d.x, y: d.y };
          });
        });
      const nodeGroups = g
        .selectAll('.node-group')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node-group')
        .style('cursor', 'pointer')
        .on('mouseover', (event, d) => setHoveredGraph(d.id))
        .on('mouseout', () => setHoveredGraph(null))
        .on('click', (event, d) => {
          event.stopPropagation();
          zoomToNode(d.id, { x: d.x, y: d.y });
        });
      nodeGroups
        .append('circle')
        .attr('class', 'hit-area')
        .attr('r', 25)
        .attr('fill', 'transparent');
      nodeGroups
        .append('circle')
        .attr('class', 'node')
        .attr('r', 10)
        .attr('fill', 'white')
        .style('transition', 'opacity 0.1s ease-in-out');
      const textGroups = g
        .selectAll('.text-group')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'text-group')
        .style('cursor', 'pointer')
        .on('mouseover', (event, d) => setHoveredGraph(d.id))
        .on('mouseout', () => setHoveredGraph(null))
        .on('click', (event, d) => {
          event.stopPropagation();
          zoomToNode(d.id, { x: d.x, y: d.y });
        });
      textGroups
        .append('rect')
        .attr('x', -15)
        .attr('y', -15)
        .attr('width', 130)
        .attr('height', 60)
        .attr('fill', 'transparent');
      textGroups
        .append('foreignObject')
        .attr('width', 100)
        .attr('height', 30)
        .style('transition', 'opacity 0.1s ease-in-out')
        .html(
          (d) =>
            `<div style="color: white; font-size: 10px; text-align: center; overflow: hidden; text-overflow: ellipsis;">${d.title}</div>`
        );
    }
  }, [articles, zoomToNode]);

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current).select('svg');
      const isZoomed = !!zoomedArticle;
      const currentHover = hoveredRow || hoveredGraph;
      svg
        .selectAll('.node-group')
        .select('circle.node')
        .attr('opacity', (d) => {
          if (isZoomed) {
            return d.id === zoomedArticle ? 1 : 0;
          }
          if (currentHover) {
            return d.id === currentHover ? 1 : 0.5;
          }
          return 0.5;
        });
      svg
        .selectAll('.text-group')
        .select('foreignObject')
        .attr('opacity', (d) =>
          isZoomed ? 0 : currentHover ? (d.id === currentHover ? 1 : 0.5) : 0.5
        );
    }
  }, [hoveredGraph, hoveredRow, zoomedArticle]);

  useEffect(() => {
    let timeoutId;
    if (zoomedArticle) {
      timeoutId = setTimeout(() => {
        const pos = nodesDataRef.current[zoomedArticle];
        if (!pos) return;
        const extraGroup = groupRef.current
          .append('g')
          .attr('class', 'extra-nodes-group');
        const extraEdgeGroup = extraGroup
          .append('g')
          .attr('class', 'extra-edges');
        const extraNodesData = [];
        const padding = 60;
        for (let i = 1; i <= 5; i++) {
          const angle = (i - 1) * ((2 * Math.PI) / 5);
          const offsetX = padding * Math.cos(angle);
          const offsetY = padding * Math.sin(angle);
          extraNodesData.push({
            id: `extra-${zoomedArticle}-${i}`,
            label: `${i} xyz`,
            x: pos.x + offsetX,
            y: pos.y + offsetY,
          });
        }
        extraEdgeGroup
          .selectAll('path')
          .data(extraNodesData)
          .enter()
          .append('path')
          .attr('fill', 'none')
          .attr('stroke', 'red')
          .attr('stroke-width', 0.2)
          .attr('d', (d) => {
            const x1 = pos.x;
            const y1 = pos.y;
            const x2 = d.x;
            const y2 = d.y;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const norm = Math.sqrt(dx * dx + dy * dy) || 1;
            const offset = 10;
            const ox = (-dy / norm) * offset;
            const oy = (dx / norm) * offset;
            return `M ${x1},${y1} Q ${mx + ox},${my + oy} ${x2},${y2}`;
          });
        const extraNodes = extraGroup
          .selectAll('.extra-node')
          .data(extraNodesData)
          .enter()
          .append('g')
          .attr('class', 'extra-node')
          .attr('transform', (d) => `translate(${d.x},${d.y})`)
          .style('opacity', 0);
        extraNodes
          .append('text')
          .text((d) => d.label)
          .attr('text-anchor', 'middle')
          .attr('dy', (d) => (d.y < pos.y ? -15 : 15))
          .attr('fill', 'white')
          .attr('opacity', '0.5')
          .style('font-size', '10px');
        extraNodes
          .append('circle')
          .attr('r', 2.5)
          .attr('fill', 'red')
          .attr('opacity', '0.5');
        extraNodes.transition().duration(100).style('opacity', 1);
      }, 100);
    }
    return () => {
      clearTimeout(timeoutId);
      if (groupRef.current) {
        groupRef.current.selectAll('.extra-nodes-group').remove();
      }
    };
  }, [zoomedArticle]);

  const currentHover = hoveredRow || hoveredGraph || zoomedArticle;

  console.log('zoomedArticle', zoomedArticle);

  return (
    <>
      <section className="container flex flex-wrap relative">
        <div className="w-10/12">
          <div className="w-full h-full relative" ref={d3Container}>
            {zoomedArticle && (
              <article className="absolute top-2 left-0 z-10 w-3/12">
                <div className="flex flex-col space-y-4">
                  <div
                    onClick={resetZoom}
                    className="text-sm text-neutral-400 underline cursor-pointer"
                  >
                    Reset Zoom
                  </div>
                  <div>
                    <div className="text-lg text-neutral-300 mb-2">
                      {zoomedArticle}
                    </div>
                    <div className="text-sm text-neutral-400">10.02.25</div>
                  </div>
                  <div className="text-sm text-neutral-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </div>
                  <div className="text-md text-rendah-red underline">
                    Access Blueprint
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
        <div className="w-2/12 pl-4">
          {articles.length &&
            articles.map((article) => {
              const images = [];
              if (article.imageObject) images.push(article.imageObject);
              if (article.body && Array.isArray(article.body)) {
                article.body.forEach((block) => {
                  if (block._type === 'image') images.push(block);
                });
              }
              const isActive =
                article.slug === hoveredRow ||
                article.slug === zoomedArticle ||
                article.slug === hoveredGraph;
              if (zoomedArticle) {
                if (article.slug === zoomedArticle) {
                  const imgSize = images.slice(0, 6).length
                    ? Math.floor(
                        (componentHeight * 0.8) / images.slice(0, 6).length
                      )
                    : 0;
                  return (
                    <div
                      key={article.slug}
                      onMouseEnter={() => setHoveredRow(article.slug)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => {
                        const pos = nodesDataRef.current[article.slug];
                        if (pos) {
                          zoomToNode(article.slug, pos);
                        }
                      }}
                      style={{ transition: 'opacity 0.5s ease', opacity: 1 }}
                      className="cursor-pointer text-neutral-500"
                    >
                      <div className="flex flex-col items-end space-y-4">
                        {images.slice(0, 6).map((img, index) => (
                          <div
                            key={index}
                            style={{
                              width: `${imgSize}px`,
                              maxWidth: `100%`,
                              height: `${imgSize}px`,
                            }}
                          >
                            <ImageNew
                              imageObject={img}
                              height={imgSize}
                              width={imgSize}
                              className="object-cover brightness-75"
                              type="blog"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              } else {
                return (
                  <div
                    key={article.slug}
                    onMouseEnter={() => setHoveredRow(article.slug)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => {
                      const pos = nodesDataRef.current[article.slug];
                      if (pos) {
                        zoomToNode(article.slug, pos);
                      }
                    }}
                    style={{
                      transition: 'opacity 0.5s ease',
                      opacity: isActive ? 1 : 0.5,
                    }}
                    className="cursor-pointer text-neutral-500"
                  >
                    <div className="flex justify-end mb-4 space-x-2">
                      {images.slice(0, 6).map((img, index) => (
                        <div key={index} className="w-[20px] h-[20px]">
                          <ImageNew
                            imageObject={img}
                            height={20}
                            width={20}
                            className="object-cover"
                            type="blog"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </section>
    </>
  );
}
