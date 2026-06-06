export const waterVertexShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Gentle ripples
  float wave = sin(pos.x * 2.0 + uTime) * 0.1;
  float wave2 = cos(pos.y * 3.0 + uTime * 0.8) * 0.1;
  pos.z += wave + wave2;
  
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const waterFragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

// Simple 2D Noise
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // Animate water flow towards the camera
  vec2 uv = vUv;
  uv.y += uTime * 0.05;
  
  // Base water color
  vec3 baseColor = vec3(0.05, 0.1, 0.2); // Deep blue
  vec3 highlightColor = vec3(0.2, 0.4, 0.6);
  
  float noise = random(floor(uv * vec2(20.0, 50.0)));
  float waveHighlight = smoothstep(0.8, 1.0, sin(uv.x * 30.0 + uTime) * cos(uv.y * 20.0 - uTime));
  
  vec3 finalColor = mix(baseColor, highlightColor, waveHighlight * 0.5 + noise * 0.1);
  
  // Fade at edges
  float alpha = smoothstep(1.0, 0.5, abs(vPosition.y / 20.0));
  alpha *= smoothstep(1.0, 0.8, abs(vPosition.x / 40.0));
  
  gl_FragColor = vec4(finalColor, alpha * 0.8);
}
`;
