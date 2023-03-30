//
//  TappableStand.swift
//  AppFimu
//
//  Created by valentin mougenot on 29/03/2023.
//

import _MapKit_SwiftUI

struct TappableStand: Identifiable, Hashable, MapAnnotationItem {
    let stand: Stand
    let tapAction: (() -> Void)?
    
    var id: Int {
        stand.id
    }
    
    var coordinate: CLLocationCoordinate2D {
        stand.coordinate
    }
    
    var annotation: some MapAnnotationProtocol {
        AnyMapAnnotation(stand.annotation, tapAction: tapAction)
    }
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
    
    static func ==(lhs: TappableStand, rhs: TappableStand) -> Bool {
        lhs.id == rhs.id
    }
}
