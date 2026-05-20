'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Trophy, Star, Heart, Zap, Award, Target } from 'lucide-react'

export interface BadgeType {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  progress: number
  maxProgress: number
  unlocked: boolean
}

interface ImpactBadgesProps {
  badges: BadgeType[]
}

export function ImpactBadges({ badges }: ImpactBadgesProps) {
  const getRarityColor = (rarity: BadgeType['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500'
      case 'rare':
        return 'bg-blue-500'
      case 'epic':
        return 'bg-purple-500'
      case 'legendary':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getRarityBorder = (rarity: BadgeType['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-500'
      case 'rare':
        return 'border-blue-500'
      case 'epic':
        return 'border-purple-500'
      case 'legendary':
        return 'border-yellow-500'
      default:
        return 'border-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Impact Badges</h3>
        <Badge variant="secondary">{badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => (
          <Card
            key={badge.id}
            className={`relative transition-all hover:shadow-lg ${
              badge.unlocked ? getRarityBorder(badge.rarity) + ' border-2' : 'opacity-60'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    badge.unlocked ? getRarityColor(badge.rarity) : 'bg-muted'
                  }`}
                >
                  {badge.icon}
                </div>
                {badge.unlocked && (
                  <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                )}
              </div>
              <CardTitle className="text-base">{badge.name}</CardTitle>
              <CardDescription className="text-xs">{badge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {!badge.unlocked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{badge.progress} / {badge.maxProgress}</span>
                  </div>
                  <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-2" />
                </div>
              )}
              {badge.unlocked && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Award className="h-3 w-3" />
                  <span>Unlocked!</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function getDefaultBadges(): BadgeType[] {
  return [
    {
      id: 'first-donation',
      name: 'First Steps',
      description: 'Make your first donation',
      icon: <Heart className="h-6 w-6 text-white" />,
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
    },
    {
      id: 'five-donations',
      name: 'Generous Giver',
      description: 'Make 5 donations',
      icon: <Star className="h-6 w-6 text-white" />,
      rarity: 'common',
      progress: 3,
      maxProgress: 5,
      unlocked: false,
    },
    {
      id: 'hundred-xlm',
      name: 'Century Club',
      description: 'Donate 100 XLM total',
      icon: <Trophy className="h-6 w-6 text-white" />,
      rarity: 'rare',
      progress: 75,
      maxProgress: 100,
      unlocked: false,
    },
    {
      id: 'streak-7',
      name: 'Week Warrior',
      description: 'Donate for 7 consecutive days',
      icon: <Zap className="h-6 w-6 text-white" />,
      rarity: 'epic',
      progress: 5,
      maxProgress: 7,
      unlocked: false,
    },
    {
      id: 'ten-campaigns',
      name: 'Campaign Hero',
      description: 'Support 10 different campaigns',
      icon: <Target className="h-6 w-6 text-white" />,
      rarity: 'rare',
      progress: 6,
      maxProgress: 10,
      unlocked: false,
    },
    {
      id: 'thousand-xlm',
      name: 'Philanthropist',
      description: 'Donate 1000 XLM total',
      icon: <Award className="h-6 w-6 text-white" />,
      rarity: 'legendary',
      progress: 250,
      maxProgress: 1000,
      unlocked: false,
    },
  ]
}
