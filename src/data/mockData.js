export const mockMessages = [
  {
    id: 1,
    user: { username: "Alice Dev" },
    content: "Hey team! Just pushed the authentication module",
    created_at: "2025-01-20T10:30:00Z",
    isOwn: false,
  },
  {
    id: 2,
    user: { username: "You" },
    content: "Great work! I'll review it this afternoon",
    created_at: "2025-01-20T10:35:00Z",
    isOwn: true,
  },
  {
    id: 3,
    user: { username: "Bob Designer" },
    content: "The new UI components are ready for integration",
    created_at: "2025-01-20T11:00:00Z",
    isOwn: false,
  },
];

export const mockTasks = [
  {
    id: 1,
    title: "Implement user authentication",
    description: "Set up JWT authentication with refresh tokens",
    status: "completed",
    priority: "high",
    assignee: "Alice",
  },
  {
    id: 2,
    title: "Design landing page",
    description: "Create responsive landing page with modern design",
    status: "in-progress",
    priority: "medium",
    assignee: "Bob",
  },
  {
    id: 3,
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated deployment",
    status: "pending",
    priority: "low",
    assignee: "Charlie",
  },
  {
    id: 4,
    title: "Database optimization",
    description: "Optimize queries and add proper indexing",
    status: "pending",
    priority: "high",
    assignee: "Alice",
  },
];
