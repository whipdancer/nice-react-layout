import React from "react";
import PropTypes from "prop-types";

export default class Panel extends React.Component {
	constructor(props) {
		super(props);
		this.calculatePanelFlex = this.calculatePanelFlex.bind(this);
		this.calculatePanelLength = this.calculatePanelLength.bind(this);
		this.toggleCollapse = this.toggleCollapse.bind(this);
	}

	calculatePanelFlex() {
		const {
			sidebar,
			collapsed,
			collapsible,
			collapseSize,
		} = this.props;
		let flex;
		if (sidebar && collapsible) {
			if (collapsed) {
				flex = collapseSize;
			} else {
				flex = this.calculatePanelLength();
			}
		} else {
			flex = this.calculatePanelLength();
		}
		return flex;
	}
	calculatePanelLength() {
		return this.props.proportion;
	}
	toggleCollapse() {
		const { collapsePanel, layoutIndex } = this.props;
		collapsePanel(layoutIndex);
	}

	render() {
		const {
			centered,
			children,
			customCss,
			collapsed,
			collapsible,
			collapseButtonClass,
			collapseButtonContent,
			collapseButtonCollapsedContent,
			collapseSize,
			collapseButtonStyle,
			collapseSwitch,
			draggingSeparator,
			flex,
			height,
			minHeight,
			minWidth,
			mockupStyle,
			orientation,
			proportion,
			sidebar,
			width,
		} = this.props;
		const styles = {
			sidebarActions: {
				height: "20px",
			},
			centered: {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},
			horizontalPanel: {
				position: "relative",
				borderRight: sidebar ? "1px solid #445161" : "none",
				cursor: draggingSeparator ? "col-resize" : "default",
				flex:
					flex !== null && flex !== undefined
						? flex
						: this.calculatePanelFlex(), // TODO: remove local calculation???
				minWidth: sidebar && collapsible && collapsed ? collapseSize : minWidth,
				overflowX: "auto",
				overflowY: "hidden",
				width: width || "auto",
			},
			verticalPanel: {
				position: "relative",
				borderRight: sidebar ? "1px solid #445161" : "none",
				cursor: draggingSeparator ? "row-resize" : "default",
				flex:
					flex !== null && flex !== undefined
						? flex
						: this.calculatePanelFlex(),
				height: height || "auto",
				minHeight:
					sidebar && collapsible && collapsed ? collapseSize : minHeight,
				overflowX: "hidden",
				overflowY: "auto",
			},
			collapsedPanel: {
				position: "relative",
				boxShadow: "1px 0px 4px black",
				flex: 0,
			},
		};
		return (
			<div
				style={Object.assign(
					{},
					orientation === "vertical"
						? styles.verticalPanel
						: styles.horizontalPanel,
					centered ? styles.centered : null,
					customCss,
					collapsed ? styles.collapsedPanel : null,
					mockupStyle
				)}
			>
				{collapsible ? (
					<div
						style={Object.assign(
							{},
							styles.sidebarActions,
							customCss && customCss.sidebarActions
								? customCss.sidebarActions
								: null
						)}
					>
						{collapseSwitch || (
							<button
								style={collapseButtonStyle || { float: "right" }}
								onClick={this.toggleCollapse}
								className={collapseButtonClass}
							>
								{!collapsed
									? collapseButtonContent
									: collapseButtonCollapsedContent}
							</button>
						)}
					</div>
				) : null}
				{children}
			</div>
		);
	}
}

Panel.propTypes = {
	centered: PropTypes.bool,
	children: PropTypes.node,
	customCss: PropTypes.object,
	draggingSeparator: PropTypes.bool,
	collapsed: PropTypes.bool,
	collapsible: PropTypes.bool,
	collapseButtonClass: PropTypes.string,
	collapseSize: PropTypes.string,
	collapseButtonStyle: PropTypes.object,
	collapseButtonContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	collapseButtonCollapsedContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	collapsePanel: PropTypes.func,
	collapseSwitch: PropTypes.element,
	// contentAlign: PropTypes.oneOf([
	//   "center",
	//   "top",
	//   "right",
	//   "bottom",
	//   "left",
	//   "top right",
	//   "bottom right",
	//   "bottom left",
	//   "top left"
	// ]),
	flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	layoutIndex: PropTypes.number,
	minHeight: PropTypes.number,
	minWidth: PropTypes.number,
	mockupStyle: PropTypes.object,
	proportion: PropTypes.number,
	sidebar: PropTypes.bool,
};

Panel.defaultProps = {
	centered: false,
	collapseSize: "30px",
	collapseButtonContent: "Collapse",
	collapseButtonCollapsedContent: "Extend",
	proportion: 1,
};
