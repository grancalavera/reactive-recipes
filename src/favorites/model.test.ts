import { describe, it, expect, vi } from 'vitest'
import { createFavorite } from './model'

// Mock nanoid to have predictable IDs in tests
vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'test-id')
}))

describe('Favorites Model', () => {
  describe('createFavorite', () => {
    it('should create a favorite with correct properties', () => {
      const favorite = createFavorite(1, 'Test Recipe')
      
      expect(favorite).toEqual({
        id: 'test-id',
        recipeId: 1,
        recipeName: 'Test Recipe'
      })
    })

    it('should create favorites with different recipe data', () => {
      const favorite = createFavorite(42, 'Another Recipe')
      
      expect(favorite.recipeId).toBe(42)
      expect(favorite.recipeName).toBe('Another Recipe')
      expect(favorite.id).toBe('test-id')
    })
  })
})