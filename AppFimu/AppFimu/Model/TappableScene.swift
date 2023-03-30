//
//  TappableScene.swift
//  AppFimu
//
//  Created by valentin mougenot on 29/03/2023.
//

import Foundation
import _MapKit_SwiftUI

struct TappableScene: Identifiable, Hashable, MapAnnotationItem {
    let scene: Scenes
    let tapAction: (() -> Void)?
    
    var id: Int {
        scene.id
    }
    
    var coordinate: CLLocationCoordinate2D {
        scene.coordinate
    }
    
    var annotation: some MapAnnotationProtocol {
        AnyMapAnnotation(scene.annotation, tapAction: tapAction)
    }
    
    func hash(into hasher: inout Hasher) {
            hasher.combine(id)
        }
    
    static func ==(lhs: TappableScene, rhs: TappableScene) -> Bool {
        lhs.id == rhs.id
    }
}
