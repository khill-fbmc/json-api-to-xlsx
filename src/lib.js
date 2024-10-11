/**
 * Flattens a nested object or array into a single level object,
 * only prefixing keys that are arrays or objects.
 *
 * @param {object} obj - The object to flatten
 * @param {string} [prefix=""] - The prefix for nested keys (used internally)
 * @returns {object} - The flattened object
 */
export function flattenObject(obj, prefix = "") {
  const flattened = {};

  for (const [key, value] of Object.entries(obj)) {
    // Determine if we need to prefix based on whether value is an array or object
    const shouldPrefix =
      Array.isArray(value) || (typeof value === "object" && value !== null);
    const newKey = shouldPrefix ? (prefix ? `${prefix}_${key}` : key) : key;

    if (Array.isArray(value)) {
      // Convert array to properties with numbered keys
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.assign(flattened, flattenObject(item, `${newKey}_${index}`));
        } else {
          flattened[`${newKey}_${index}`] = item;
        }
      });
    } else if (typeof value === "object" && value !== null) {
      // Recursively flatten objects
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      // Assign primitive values directly, with no prefix
      flattened[newKey] = value;
    }
  }

  return flattened;
}

export const flatObjectMap = (arr) => arr.map(flattenObject);
