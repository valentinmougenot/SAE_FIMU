//
//  Scene.swift
//  AppFimu
//
//  Created by user235496 on 3/7/23.
//

import Foundation
import MapKit
import SwiftUI

struct Scenes: Identifiable, Codable, Hashable, MapAnnotationItem {
    
    var id: Int
    var libelle: String
    var jauge: Int?
    var latitude: Double
    var longitude: Double
    var typescene: TypeScene
    
    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: CLLocationDegrees(latitude ), longitude: CLLocationDegrees(longitude ))
    }
    
    var annotation: some MapAnnotationProtocol {
        MapAnnotation(coordinate: coordinate) {
            ZStack(alignment: .center) {
                Circle()
                    .foregroundColor(.clear)
                    .frame(width: 30, height: 30, alignment: .center)
                           
                typescene.icone
            }
            .scaleEffect(1.5, anchor: .center)
        }
    }
    
}


