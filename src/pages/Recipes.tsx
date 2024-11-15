import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  prepTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Butter Chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Creamy and flavorful chicken curry that\'s a favorite across India.',
    prepTime: '45 mins',
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '800g chicken thighs, cut into pieces',
      '2 cups tomato puree',
      '1 cup heavy cream',
      '2 tbsp butter',
      '2 tbsp ginger-garlic paste',
      '2 tsp garam masala',
      '1 tsp red chili powder',
      'Salt to taste'
    ],
    instructions: [
      'Marinate chicken with yogurt and spices for 2 hours',
      'Cook marinated chicken in butter until golden',
      'Add tomato puree and simmer for 15 minutes',
      'Pour in cream and cook for another 10 minutes',
      'Garnish with butter and serve hot'
    ]
  },
  {
    id: 2,
    name: 'Palak Paneer',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'A classic vegetarian dish made with spinach and cottage cheese.',
    prepTime: '30 mins',
    servings: 3,
    difficulty: 'Easy',
    ingredients: [
      '500g spinach, blanched and pureed',
      '200g paneer, cubed',
      '2 onions, chopped',
      '2 tomatoes, pureed',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '1 tsp garam masala',
      'Salt to taste'
    ],
    instructions: [
      'Blanch spinach and make a smooth puree',
      'Sauté cumin seeds and onions until golden',
      'Add tomato puree and cook until oil separates',
      'Add spinach puree and simmer for 10 minutes',
      'Add paneer cubes and cook for 5 more minutes'
    ]
  },
  {
    id: 3,
    name: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Aromatic rice dish layered with spices and your choice of protein.',
    prepTime: '1 hour',
    servings: 6,
    difficulty: 'Hard',
    ingredients: [
      '500g basmati rice',
      '500g meat/vegetables',
      '2 onions, sliced',
      '4 tbsp ghee',
      '2 tbsp biryani masala',
      'Saffron strands',
      'Mint and coriander leaves',
      'Salt to taste'
    ],
    instructions: [
      'Soak rice for 30 minutes and par-boil',
      'Cook meat/vegetables with spices until tender',
      'Layer rice and meat mixture alternatively',
      'Add saffron milk and seal the pot',
      'Cook on low heat for 20 minutes'
    ]
  }
];

const RecipesPage: React.FC = () => {
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'All'>('All');

  const toggleRecipe = (recipeId: number) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  const filteredRecipes = selectedDifficulty === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Recipe Collection</h1>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedDifficulty === difficulty
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                <p className="text-gray-600 mb-4">{recipe.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleRecipe(recipe.id)}
                  className="flex items-center justify-between w-full text-green-600 hover:text-green-700 transition"
                >
                  <span className="font-medium">
                    {expandedRecipe === recipe.id ? 'Hide Details' : 'Show Details'}
                  </span>
                  {expandedRecipe === recipe.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {expandedRecipe === recipe.id && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div>
                      <h3 className="font-semibold mb-2">Ingredients</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Instructions</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RecipesPage;