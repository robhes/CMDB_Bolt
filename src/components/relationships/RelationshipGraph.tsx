import React, { useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Asset, AssetRelationship } from '../../types/assets';
import { assetTypeColors } from '../../utils/colors';

interface RelationshipGraphProps {
  assets: Asset[];
  relationships: AssetRelationship[];
  onNodeClick?: (asset: Asset) => void;
}

interface GraphData {
  nodes: Array<{
    id: string;
    name: string;
    type: string;
    color: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    type: string;
  }>;
}

export const RelationshipGraph: React.FC<RelationshipGraphProps> = ({
  assets,
  relationships,
  onNodeClick,
}) => {
  const graphData = useMemo<GraphData>(() => {
    return {
      nodes: assets.map(asset => ({
        id: asset.id,
        name: asset.name,
        type: asset.type,
        color: assetTypeColors[asset.type],
      })),
      links: relationships.map(rel => ({
        source: rel.source_asset_id,
        target: rel.target_asset_id,
        type: rel.relationship_type,
      })),
    };
  }, [assets, relationships]);

  return (
    <div className="h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeColor={node => node.color}
        linkLabel={link => link.type.replace('_', ' ')}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x!, node.y!);
        }}
        onNodeClick={(node: any) => {
          const asset = assets.find(a => a.id === node.id);
          if (asset && onNodeClick) {
            onNodeClick(asset);
          }
        }}
      />
    </div>
  );
};