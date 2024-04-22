import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BaseIdModel } from '../../abstract/base-id.model';
import { LoggerWriter } from '../../logger/services/logger.service';
import { SeoTagModel } from '../models/seo-tag.model';

@Injectable({
	providedIn: 'root',
})
export class MetaTagService extends BaseIdModel {
	SEO_LIST: SeoTagModel[] = [];
	tags: string[] = [];

	constructor(private meta: Meta) {
		super();
	}

	getClassName(): string {
		return 'MetaTagService';
	}

	// ---- META
	addMeta(tags: MetaDefinition[]): HTMLMetaElement[] | null {
		if (tags && tags.length) {
			return tags.length === 1 ? [this.meta.addTag(tags[0])] : this.meta.addTags(tags);
		}
		return undefined;
	}
	getMeta(attrSelector: string, multi?: boolean): HTMLMetaElement[] | null {
		return multi ? this.meta.getTags(attrSelector) : [this.meta.getTag(attrSelector)];
	}
	updateMeta(tag: MetaDefinition, selector?: string): HTMLMetaElement | null {
		return this.meta.updateTag(tag, selector);
	}
	removeMeta(meta: string | HTMLMetaElement): void {
		if (typeof meta === 'string') {
			this.meta.removeTag(meta);
		} else {
			this.meta.removeTagElement(meta);
		}
	}

	// --- COMPONENT
	// SEO_LIST
	initList(list: SeoTagModel[]) {
		this.SEO_LIST.length = 0;
		this.tags.length = 0;
		this.SEO_LIST.push(...list);
		this.refreshTagsList(list);
	}
	addPage(tags: MetaDefinition[], url?: string | string[]) {
		const link: string = this.getUrl(url);
		const seoModel: SeoTagModel = {};
		if (link) {
			seoModel.url = link;
		}
		seoModel.tags = tags;
		this.SEO_LIST.push(seoModel);
		seoModel.tags.forEach((tag) => {
			if (!this.existTagName(tag.name)) {
				this.tags.push(tag.name);
			}
		});
	}
	addList(list: SeoTagModel[]) {
		this.SEO_LIST.push(...list);
		this.refreshTagsList(list);
	}
	getTagsByPage(url: string | string[]): MetaDefinition[] {
		const link: string = this.getUrl(url);
		if (link) {
			return this.SEO_LIST.find((el) => el.url === link)?.tags;
		}
		return undefined;
	}
	// OPERATION TAG
	setTagsForPage(activatedRoute: ActivatedRoute, log?: LoggerWriter) {
		if (
			activatedRoute &&
			activatedRoute.snapshot &&
			activatedRoute.snapshot['_urlSegment'] &&
			activatedRoute.snapshot['_urlSegment']['segments'] &&
			activatedRoute.snapshot['_urlSegment']['segments'][0] &&
			activatedRoute.snapshot['_urlSegment']['segments'][0].path &&
			activatedRoute.routeConfig &&
			activatedRoute.routeConfig.path
		) {
			const url =
				activatedRoute.snapshot['_urlSegment']['segments'][0].path +
				'/' +
				activatedRoute.routeConfig.path;
			const tags = this.getTagsByPage(url);
			this.removeAllTags();
			this.addMeta(tags);
			if (log) {
				log.debug(url, tags);
			}
		}
	}
	removeAllTags() {
		this.tags.forEach((tag) => {
			this.removeMeta('name="' + tag + '"');
		});
	}

	// --- UTILS
	private getUrl(url?: string | string[]): string | undefined {
		if (url) {
			if (Array.isArray(url)) {
				return url.join('/');
			} else {
				return url;
			}
		}
		return undefined;
	}
	private refreshTagsList(list: SeoTagModel[]): void {
		list.forEach((seo) => {
			seo.tags.forEach((tag) => {
				if (!this.existTagName(tag.name)) {
					this.tags.push(tag.name);
				}
			});
		});
	}
	private existTagName(name: string): boolean {
		return this.tags.findIndex((el) => el === name) !== -1;
	}
}
