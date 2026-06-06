export const waterfallVertexShader = `
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Create displacement for the falling water
  float wave = sin(pos.y * 5.0 - uTime * 10.0) * 0.2;
  float wave2 = cos(pos.x * 10.0 + uTime * 5.0) * 0.1;
  
  pos.z += wave + wave2;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const waterfallFragmentShader = `
uniform float uTime;
varying vec2 vUv;

// Simple 2D Noise
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // Animate UVs downward
  vec2 uv = vUv;
  uv.y -= uTime * 1.5;
  
  // Add some horizontal distortion
  uv.x += sin(uv.y * 10.0) * 0.02;
  
  // Generate foam streams
  float stream1 = smoothstep(0.4, 0.6, sin(uv.x * 20.0));
  float stream2 = smoothstep(0.8, 1.0, sin(uv.x * 40.0 + uv.y * 5.0));
  
  // Add noise
  float noise = random(floor(uv * vec2(100.0, 10.0)));
  
  vec3 waterColor = vec3(0.5, 0.7, 0.9); // Light blue
  vec3 foamColor = vec3(0.9, 0.95, 1.0); // White
  
  float mixValue = stream1 * 0.5 + stream2 * 0.5 + noise * 0.2;
  
  vec3 finalColor = mix(waterColor, foamColor, mixValue);
  
  // Fade at the bottom
  float alpha = smoothstep(0.0, 0.2, vUv.y) * 0.9;
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;
