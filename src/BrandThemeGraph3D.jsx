import React, { useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';

const BrandThemeGraph3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // -------------------------
    // 1️⃣ SAMPLE DATA
    // -------------------------
    const sampleData = [
      {
        Brand: "EltaMD",
        "Product Name": "UV Facial",
        "Customer Satisfaction": "['positive']",
        "Effectiveness": "['positive']",
        "Customer Satisfaction_Subtheme": "First-time Use",
        "Effectiveness_Subtheme": "Lightweight",
        Sentiment: "positive"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Lip Balm",
        Sentiment: "negative"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Physical",
        "Price Performance": "['positive']",
        "Price Performance_Subtheme": "First-time Use",
        Sentiment: "negative"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Clear",
        Sentiment: "negative"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Physical",
        "Suits all skin types": "['negative']",
        "Customer Satisfaction": "['negative']",
        "Effectiveness": "['positive']",
        "Convenience": "['positive']",
        "Suits all skin types_Subtheme": "Sensitive skin",
        "Customer Satisfaction_Subtheme": "Re-purchase",
        "Effectiveness_Subtheme": "Lightweight",
        "Convenience_Subtheme": "Travel Friendly",
        Sentiment: "neutral"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Lip Balm",
        Sentiment: "positive"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Pure",
        "Customer Satisfaction": "['neutral']",
        "Effectiveness_Subtheme": "Lightweight",
        Sentiment: "negative"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Lip Balm",
        "Suits all skin types": "['neutral']",
        "Price Performance": "['positive']",
        "Suits all skin types_Subtheme": "Durability",
        "Price Performance_Subtheme": "Budget Friendly",
        Sentiment: "negative"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Restore",
        "Price Performance": "['positive']",
        "Customer Satisfaction": "['positive']",
        "Effectiveness": "['positive']",
        "Price Performance_Subtheme": "Value for Money",
        "Age and Skin Benefits_Subtheme": "Long-term Benefits",
        "Convenience_Subtheme": "Travel Friendly",
        Sentiment: "positive"
      },
      {
        Brand: "EltaMD",
        "Product Name": "UV Pure",
        "Sunscreen": "['positive']",
        "Customer Satisfaction": "['positive']",
        "Effectiveness_Subtheme": "Lightweight",
        "Segment": "Dry skin",
        Sentiment: "positive"
      }
    ];

    // -------------------------
    // 2️⃣ NODE / LINK CREATION
    // -------------------------
    const nodes = [];
    const links = [];
    const nodeMap = new Map();

    const addNode = (id, label, type, color, parent = null) => {
      if (!nodeMap.has(id)) {
        nodeMap.set(id, nodes.length);
        nodes.push({ id, label, type, color, parent });
      }
      return nodeMap.get(id);
    };

    const themeColumns = [
      'Suits all skin types', 'Packaging Issues', 'Price Performance',
      'Customer Satisfaction', 'Age and Skin Benefits', 'Effectiveness',
      'Promotions', 'Convenience', 'Diverse Options'
    ];

    // Mapping of themes to their respective subthemes
    const subthemeMapping = {
      'Suits all skin types': ['Sensitive skin', 'Dry skin', 'Oily skin', 'Combination', 'Acne Control'],
      'Packaging Issues': ['Leakage', 'Eco-friendly'],
      'Price Performance': ['Value for Money', 'Budget Friendly', 'Overpriced'],
      'Customer Satisfaction': ['Re-purchase', 'First-time Use', 'Loyalty'],
      'Age and Skin Benefits': ['Anti-aging', 'Brightening', 'Long-term Benefits', 'Hydration', 'Immediate Results'],
      'Effectiveness': ['Lightweight', 'No Effect'],
      'Promotions': ['Free Samples', 'Influencer Marketing', 'Discounts'],
      'Convenience': ['Travel Friendly', 'Availability', 'Ease of Use'],
      'Diverse Options': ['Fragrance Variants', 'Sizes', 'Shades', 'Durability']
    };

    sampleData.forEach((row, idx) => {
      const brand = row.Brand || 'Unknown';
      const product = row['Product Name'] || 'Unknown Product';
      const sentiment = row.Sentiment || 'neutral';

      const brandId = addNode(brand, brand, 'brand', '#f59e0b');
      const productId = `${brand}_${product}`;
      const productIndex = addNode(productId, product, 'product', '#3b82f6', brand);
      links.push({ source: brand, target: productId });

      themeColumns.forEach(theme => {
        if (row[theme]) {
          const themeId = `${productId}_${theme}`;
          addNode(themeId, theme, 'theme', '#8b5cf6', productId);
          links.push({ source: productId, target: themeId });

          const subthemeCol = subthemeMapping[theme];
          if (subthemeCol && row[subthemeCol]) {
            const subtheme = row[subthemeCol];
            const subthemeId = `${themeId}_${subtheme}`;
            addNode(subthemeId, subtheme, 'subtheme', '#ec4899', themeId);
            links.push({ source: themeId, target: subthemeId });

            // sentiment node
            const sentimentColor =
              sentiment === 'positive' ? '#22c55e' :
              sentiment === 'negative' ? '#ef4444' : '#64748b';
            const sentimentId = `${subthemeId}_${sentiment}_${idx}`;
            addNode(sentimentId, sentiment, 'sentiment', sentimentColor, subthemeId);
            links.push({ source: subthemeId, target: sentimentId });
          }
        }
      });

      // overall sentiment link
      const sentimentColor =
        sentiment === 'positive' ? '#22c55e' :
        sentiment === 'negative' ? '#ef4444' : '#64748b';
      const sentimentNodeId = `${productId}_sentiment_${sentiment}_${idx}`;
      addNode(sentimentNodeId, `${sentiment} review`, 'sentiment', sentimentColor, productId);
      links.push({ source: productId, target: sentimentNodeId });
    });

    const graphData = { nodes, links };

    // -------------------------
    // 3️⃣ 3D FORCE GRAPH SETUP
    // -------------------------
    const elem = containerRef.current;
    const Graph = ForceGraph3D()(elem)
      .graphData(graphData)
      .nodeAutoColorBy('type')
      .nodeLabel(node => `${node.label} (${node.type})`)
      .nodeThreeObject(node => {
        const geometry = new THREE.SphereGeometry(
          node.type === 'brand' ? 10 :
          node.type === 'product' ? 6 :
          node.type === 'theme' ? 4 :
          node.type === 'subtheme' ? 3 : 2.5,
          16, 16
        );
        const material = new THREE.MeshBasicMaterial({ color: node.color });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
      })
      .linkColor(() => 'rgba(255,255,255,0.4)')
      .linkOpacity(0.4)
      .linkDirectionalParticles(2)
      .linkDirectionalParticleWidth(1)
      .backgroundColor('#0f172a')
      .onNodeClick(node => {
        alert(`Node: ${node.label}\nType: ${node.type}`);
      });

    Graph.cameraPosition({ z: 250 });

    return () => {
      elem.innerHTML = '';
    };
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 relative">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-800 bg-opacity-90 px-6 py-3 rounded-lg text-center">
        <h1 className="text-xl font-bold text-white">EltaMD Brand Analysis - 3D Force Graph</h1>
        <p className="text-xs text-slate-300 mt-1">Brand → Products → Themes → Sub-themes → Sentiments</p>
      </div>
    </div>
  );
};

export default BrandThemeGraph3D;
