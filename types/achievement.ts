import type {
  AchievementCategory,
  AchievementMetric,
  ContentId,
} from "./common"

export interface Achievement {
  id: ContentId
  statement: string
  category: AchievementCategory
  metric?: AchievementMetric
}
