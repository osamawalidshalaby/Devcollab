import { formatDistanceToNow } from "date-fns";

function getRelativeTime(createdAt) {
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
}

// Example
const created_at = "2025-08-29T22:40:00.000Z";
console.log(getRelativeTime(created_at));
// 👉 "5 days ago" أو "in 2 days" حسب التاريخ
export { getRelativeTime };