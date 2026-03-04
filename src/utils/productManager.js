import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsFilePath = join(__dirname, "../../data/products.json");

// Inicializar arquivo se não existir
if (!existsSync(productsFilePath)) {
  writeFileSync(productsFilePath, JSON.stringify([], null, 2));
}

/**
 * Obter todos os produtos
 */
export function getProducts() {
  try {
    const data = readFileSync(productsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Obter produto específico
 */
export function getProduct(productId) {
  const products = getProducts();
  return products.find((p) => p.id === productId);
}

/**
 * Adicionar novo produto
 */
export function addProduct(product) {
  const products = getProducts();
  products.push(product);
  writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  return product;
}

/**
 * Atualizar produto
 */
export function updateProduct(productId, updates) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  return products[index];
}

/**
 * Deletar produto
 */
export function deleteProduct(productId) {
  const products = getProducts();
  const filteredProducts = products.filter((p) => p.id !== productId);
  writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, 2));
  return true;
}
