"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seed_bookmarks_1 = __importDefault(require("./seed/seed-bookmarks"));
const seed_posts_1 = __importDefault(require("./seed/seed-posts"));
const seed_users_1 = __importDefault(require("./seed/seed-users"));
async function seed() {
    await (0, seed_users_1.default)();
    await (0, seed_posts_1.default)(500000);
    await (0, seed_bookmarks_1.default)(1500000);
}
seed();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkVBQWtEO0FBQ2xELG1FQUEwQztBQUMxQyxtRUFBMEM7QUFFMUMsS0FBSyxVQUFVLElBQUk7SUFDakIsTUFBTSxJQUFBLG9CQUFTLEdBQUUsQ0FBQztJQUNsQixNQUFNLElBQUEsb0JBQVMsRUFBQyxNQUFPLENBQUMsQ0FBQztJQUN6QixNQUFNLElBQUEsd0JBQWEsRUFBQyxPQUFTLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VlZEJvb2ttYXJrcyBmcm9tIFwiLi9zZWVkL3NlZWQtYm9va21hcmtzXCI7XG5pbXBvcnQgc2VlZFBvc3RzIGZyb20gXCIuL3NlZWQvc2VlZC1wb3N0c1wiO1xuaW1wb3J0IHNlZWRVc2VycyBmcm9tIFwiLi9zZWVkL3NlZWQtdXNlcnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gc2VlZCgpIHtcbiAgYXdhaXQgc2VlZFVzZXJzKCk7XG4gIGF3YWl0IHNlZWRQb3N0cyg1MDBfMDAwKTtcbiAgYXdhaXQgc2VlZEJvb2ttYXJrcygxXzUwMF8wMDApO1xufVxuXG5zZWVkKCk7XG4iXX0=