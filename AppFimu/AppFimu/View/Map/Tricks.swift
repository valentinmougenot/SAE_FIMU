//
//  tricks.swift
//  AppFimu
//
//  Created by jobst gaetan on 15/03/2023.
//

import Foundation
import SwiftUI
import MapKit


protocol MapAnnotationItem: Identifiable {
    associatedtype Annotation: MapAnnotationProtocol

    var coordinate: CLLocationCoordinate2D { get }
    var annotation: Annotation { get }
}

struct AnyMapAnnotationItem: MapAnnotationItem {
    let id: AnyHashable
    let coordinate: CLLocationCoordinate2D
    let annotation: AnyMapAnnotation
    let base: Any

    init<T: MapAnnotationItem>(_ base: T, tapAction: (() -> Void)? = nil) {
        self.id = base.id
        self.coordinate = base.coordinate
        self.annotation = AnyMapAnnotation(base.annotation, tapAction: tapAction)
        self.base = base
    }

}

struct AnyMapAnnotation: MapAnnotationProtocol {
    let _annotationData: _MapAnnotationData
    let base: Any
    let tapAction: (() -> Void)?

    init<T: MapAnnotationProtocol>(_ base: T, tapAction: (() -> Void)? = nil) {
        self._annotationData = base._annotationData
        self.base = base
        self.tapAction = tapAction
    }
}

extension Map {

    init<Items>(
        coordinateRegion: Binding<MKCoordinateRegion>,
        interactionModes: MapInteractionModes = .all,
        showsUserLocation: Bool = false,
        userTrackingMode: Binding<MapUserTrackingMode>? = nil,
        annotationItems: Items
    ) where Content == _DefaultAnnotatedMapContent<Items>,
        Items: RandomAccessCollection,
        Items.Element == AnyMapAnnotationItem
    {
        self.init(
            coordinateRegion: coordinateRegion,
            interactionModes: interactionModes,
            showsUserLocation: showsUserLocation,
            userTrackingMode: userTrackingMode,
            annotationItems: annotationItems,
            annotationContent: { $0.annotation }
        )
    }

    init<Items>(
        mapRect: Binding<MKMapRect>,
        interactionModes: MapInteractionModes = .all,
        showsUserLocation: Bool = false,
        userTrackingMode: Binding<MapUserTrackingMode>? = nil,
        annotationItems: Items
    ) where Content == _DefaultAnnotatedMapContent<Items>,
        Items: RandomAccessCollection,
        Items.Element == AnyMapAnnotationItem
    {
        self.init(
            mapRect: mapRect,
            interactionModes: interactionModes,
            showsUserLocation: showsUserLocation,
            userTrackingMode: userTrackingMode,
            annotationItems: annotationItems,
            annotationContent: { $0.annotation }
        )
    }
}
