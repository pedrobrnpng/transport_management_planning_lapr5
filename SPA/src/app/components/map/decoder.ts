import { OmvTileDecoderService, OmvTilerService } from "@here/harp-omv-datasource/index-worker";

OmvTileDecoderService.start();
OmvTilerService.start(); // Only needed for untiled geojson