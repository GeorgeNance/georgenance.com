import { defineCollection, z } from '@nuxt/content'
// import { asOgImageCollection } from 'nuxt-og-image/content'

export default {
	collections: {

		article: defineCollection({
			type: 'page',
			source: 'articles/**/*.md',
			schema: z.object({
				title: z.string(),
				description: z.string(),
				ogImage: z.string().optional(),
				slug: z.string(),
				date: z.date(),
				tags: z.array(z.string()),
				published: z.boolean(),
				archived: z.boolean().optional(),
				updated_at: z.date().optional(),
				hide_toc: z.boolean().optional(),
			})
		}),
		tag: defineCollection({
			type: 'data',
			source: 'tags/**.json',
			schema: z.object({
				title: z.string(),
				description: z.string(),
				slug: z.string(),
			})
		}),

		page: defineCollection({
			type: 'page',
			source: '**/*.md',
			schema: z.object({
				title: z.string(),
				description: z.string(),
				slug: z.string(),
				date: z.date().optional(),
				updated_at: z.date().optional(),

			}),



		}),
		bag: defineCollection({
			type: 'data',
			source: 'bag/**.json',
			schema: z.object({
				name: z.string(),
				description: z.string(),
				order: z.number().optional(),
				items: z.array(z.object({
					name: z.string(),
					description: z.string(),
					url: z.string().optional(),
					thumbnail: z.string().optional(),
				}))
			})
		})
	}
}