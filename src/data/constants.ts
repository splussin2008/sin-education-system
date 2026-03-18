import { Grade, Subject, Level } from '@/types/material';

export const GRADES: Grade[] = ['中1', '中2', '中3', '高校受験', '高1', '高2', '高3', '大学受験'];

export const JHS_SUBJECTS: Subject[] = ['国語', '数学', '英語', '理科', '地理', '歴史', '公民'];

export const HS_SUBJECTS: Subject[] = [
  '国語', '英語',
  '数学I', '数学A', '数学II', '数学B', '数学III', '数学C',
  '物理基礎', '物理', '化学基礎', '化学', '生物基礎', '生物', '地学基礎', '地学',
  '歴史総合', '日本史探究', '世界史探究', '地理総合', '地理探究', '公共', '倫理', '政治・経済'
];

export const LEVELS: Level[] = ['基礎', '標準', '発展', 'テスト対策'];
